import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmarks.service';
import { LandmarkDTO } from './landmark.dto';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { LandmarkConverter } from './landmark.converter';

@Controller('landmarks')
export class LandmarksController {
    constructor(
        private readonly landmarksService: LandmarksService
    ) {}

    @ApiTags('Landmarks (Admin)')
    @ApiResponse({
        status: 200,
        type: [LandmarkDTO],
        description: 'Returns the full list of Landmark documents'
    })
    @Get()
    async getLandmarks(): Promise<LandmarkDTO[]> {
        const landmarks = await this.landmarksService.getAllLandmarks();
        return landmarks.map(landmark => LandmarkConverter.convertToDto(landmark)); 
    }

    @ApiTags('Landmarks (Public)')
    @ApiResponse({
        status: 200,
        type: [LandmarkDTO],
        description: 'Returns the full list of Landmark documents for selected city'
    })
    @Get('by-city/:id')
    async getLandmarksByCity(
        @Param('id') cityId: string
    ): Promise<LandmarkDTO[]> {
        const landmarks = await this.landmarksService.getAllLandmarks(cityId);
        return landmarks.map(landmark => LandmarkConverter.convertToDto(landmark)); 
    }

    @ApiTags('Landmarks (Admin)')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns a single Landmark document document by ID'
    })
    @Get(':id')
    async getLandmarkById(
        @Param('id') landmarkId: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarksService.getSingleById(landmarkId);
        return LandmarkConverter.convertToDto(landmark);
    }

    @ApiTags('Landmarks (Public)')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns a single Landmark document by slug'
    })
    @Get('by-slug/:slug')
    async getLandmarkBySlug(
        @Param('slug') landmarkSlug: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarksService.getSingleBySlug(landmarkSlug);
        return LandmarkConverter.convertToDto(landmark);
    }

    @ApiTags('Landmarks (Admin)')
    @ApiResponse({
        status: 201,
        type: LandmarkDTO,
        description: 'Returns the created Landmark document'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    @HttpCode(201)
    @Post()
    async createLandmark(
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarksService.validateBodyData(body);
        const newLandmark = await this.landmarksService.insert(validatedBody);
        return LandmarkConverter.convertToDto(newLandmark);
    }

    @ApiTags('Landmarks (Admin)')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns the updated Landmark document'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    @Patch(':id')
    async updateLandmark(
        @Param('id') landmarkId: string,
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarksService.validateBodyData(body);
        const updatedLandmark = await this.landmarksService.update(landmarkId, validatedBody);
        return LandmarkConverter.convertToDto(updatedLandmark);
    }

    @ApiTags('Landmarks (Admin)')
    @ApiResponse({
        status: 204,
        description: 'Deletes Landmark document by ID'
    })
    @HttpCode(204)
    @Delete(':id')
    async delete(
        @Param('id') landmarkId: string
    ): Promise<void> {
        await this.landmarksService.delete(landmarkId);
    }
}
