import { Controller, UseGuards, Get, Param, HttpCode, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles.decorator';
import { Role } from './../helpers/enums';

import { ToursService } from './tours.service';
import { TourCreateUpdateDTO } from './tour-create-update.dto';
import { TourDTO } from './tour.dto';
import { TourConverter } from './tour.converter';

@Controller('tours')
export class ToursController {
    constructor(
        private toursService: ToursService
    ) {}

    @ApiTags('Tours (Admin)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: [TourDTO],
        description: 'Returns the full list of Tour documents'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getTours(): Promise<TourDTO[]> {
        const tours = await this.toursService.getAllTours();
        return tours.map(tour => TourConverter.convertToDto(tour)); 
    }

    @ApiTags('Tours (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: [TourDTO],
        description: 'Returns the full list of Tour documents for logged User'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @Get('by-user/:userId')
    async getToursByUser(
        @Param('userId') userId: string
    ): Promise<TourDTO[]> {
        const tours = await this.toursService.getAllTours(userId);
        return tours.map(tour => TourConverter.convertToDto(tour)); 
    }

    @ApiTags('Tours (User)')    
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: TourDTO,
        description: 'Returned a single Tour document by ID'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @Get(':id')
    async getTourById(
        @Param('id') tourId: string
    ): Promise<TourDTO> {
        const tour = await this.toursService.getSingleById(tourId);
        return TourConverter.convertToDto(tour);
    }

    @ApiTags('Tours (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        type: TourDTO,
        description: 'Returned the created Tour document'
    })
    @ApiBody({
        type: TourCreateUpdateDTO
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @HttpCode(201)
    @Post()
    async createTour(
        @Body() body: TourCreateUpdateDTO
    ): Promise<TourDTO> {
        const validatedBody = await this.toursService.validateBodyData(body);
        const newTour = await this.toursService.insert(validatedBody);
        return TourConverter.convertToDto(newTour);
    }

    @ApiTags('Tours (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: TourDTO,
        description: 'Returned the updated Tour document'
    })
    @ApiBody({
        type: TourCreateUpdateDTO
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @Patch(':id')
    async updateTour(
        @Param('id') tourId: string,
        @Body() body: TourCreateUpdateDTO
    ): Promise<TourDTO> {
        const validatedBody = await this.toursService.validateBodyData(body);
        const updatedTour = await this.toursService.update(tourId, validatedBody);
        return TourConverter.convertToDto(updatedTour);
    }

    @ApiTags('Tours (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 204,
        description: 'Deleted Tour document by ID'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @HttpCode(204)
    @Delete(':id')
    async deleteTour(
        @Param('id') tourId: string
    ): Promise<void> {
        await this.toursService.delete(tourId);
    }
}
