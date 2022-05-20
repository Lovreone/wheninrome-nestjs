import { CityCreateUpdateDTO } from './city-create-update.dto';
import { CityConverter } from './city.converter';
import { CityDTO } from './city.dto';
import { CitiesService } from './cities.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Delete, HttpCode, Param, Patch, Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';


@Controller('cities')
export class CitiesController {
    constructor(
        private citiesService: CitiesService
    ) {}

    @ApiTags('Cities (Admin)')
    @ApiResponse({
        status: 200,
        type: [CityDTO],
        description: 'Returns the full list of City documents'
    })
    @Get()
    async getAllCities(): Promise<CityDTO[]> {
        const cities = await this.citiesService.getAll();
        return cities.map(city => CityConverter.convertToDto(city)); 
    }

    @ApiTags('Cities (Public)')
    @ApiResponse({
        status: 200,
        type: [CityDTO],
        description: 'Returns the list of active City documents'
    })
    @Get('active')
    async getActiveCities(): Promise<CityDTO[]> {
        const cities = await this.citiesService.getAllActive();
        return cities.map(city => CityConverter.convertToDto(city)); 
    }

    @ApiTags('Cities (Admin)')    
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned a single City document document by ID'
    })
    @Get(':id')
    async getCityById(
        @Param('id') cityId: string
    ): Promise<CityDTO> {
        const city = await this.citiesService.getSingleById(cityId);
        return CityConverter.convertToDto(city);
    }

    @ApiTags('Cities (Public)')
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned a single City document by slug'
    })
    @Get('by-slug/:slug')
    async getCityBySlug(
        @Param('slug') citySlug: string
    ): Promise<CityDTO> {
        const city = await this.citiesService.getSingleBySlug(citySlug);
        return CityConverter.convertToDto(city);
    }

    @ApiTags('Cities (Admin)')
    @ApiResponse({
        status: 201,
        type: CityDTO,
        description: 'Returned the created City document'
    })
    @ApiBody({
        type: CityCreateUpdateDTO
    })
    // @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post()
    async createCity(
        @Body() body: CityCreateUpdateDTO
    ): Promise<CityDTO> {
        const validatedBody = await this.citiesService.validateBodyData(body);
        const newCity = await this.citiesService.insert(validatedBody);
        return CityConverter.convertToDto(newCity);
    }

    @ApiTags('Cities (Admin)')
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned the updated City document'
    })
    @ApiBody({
        type: CityCreateUpdateDTO
    })
    @Patch(':id')
    async updateCity(
        @Param('id') cityId: string,
        @Body() body: CityCreateUpdateDTO
    ): Promise<CityDTO> {
        const validatedBody = await this.citiesService.validateBodyData(body);
        const updatedCity = await this.citiesService.update(cityId, validatedBody);
        return CityConverter.convertToDto(updatedCity);
    }

    @ApiTags('Cities (Admin)')
    @ApiResponse({
        status: 204,
        description: 'Deleted City document by ID'
    })
    @HttpCode(204)
    @Delete(':id')
    async deleteCity(
        @Param('id') cityId: string
    ): Promise<void> {
        // TODO: Decide if this should be available to the admin or not
        await this.citiesService.delete(cityId);
    }
}
