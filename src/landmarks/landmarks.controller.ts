import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmarks.service';
import { LandmarkDTO } from './landmark.dto';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { LandmarkConverter } from './landmark.converter';

@ApiTags('Landmarks')
@Controller('landmarks')
export class LandmarksController {
    constructor(
        private readonly landmarksService: LandmarksService
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [LandmarkDTO],
        description: 'Returns the full list of Landmark documents'
    })
    async getLandmarks(): Promise<LandmarkDTO[]> {
        const landmarks = await this.landmarksService.getAllLandmarks();
        return landmarks.map(landmark => LandmarkConverter.convertToDto(landmark)); 
    }

    @Get('by-city/:id')
    @ApiResponse({
        status: 200,
        type: [LandmarkDTO],
        description: 'Returns the full list of Landmark documents for selected city'
    })
    async getLandmarksByCity(
        @Param('id') cityId: string
    ): Promise<LandmarkDTO[]> {
        const landmarks = await this.landmarksService.getAllLandmarks(cityId);
        return landmarks.map(landmark => LandmarkConverter.convertToDto(landmark)); 
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns a single Landmark document document by ID'
    })
    async getLandmarkById(
        @Param('id') landmarkId: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarksService.getSingleById(landmarkId);
        return LandmarkConverter.convertToDto(landmark);
    }

    @Get('by-slug/:slug')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns a single Landmark document by slug'
    })
    async getLandmarkBySlug(
        @Param('slug') landmarkSlug: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarksService.getSingleBySlug(landmarkSlug);
        return LandmarkConverter.convertToDto(landmark);
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        type: LandmarkDTO,
        description: 'Returns the created Landmark document'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    async createLandmark(
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarksService.validateBodyData(body);
        const newLandmark = await this.landmarksService.insert(validatedBody);
        return LandmarkConverter.convertToDto(newLandmark);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returns the updated Landmark document'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    async updateLandmark(
        @Param('id') landmarkId: string,
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarksService.validateBodyData(body);
        const updatedLandmark = await this.landmarksService.update(landmarkId, validatedBody);
        return LandmarkConverter.convertToDto(updatedLandmark);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deletes Landmark document by ID'
    })
    async delete(
        @Param('id') landmarkId: string
    ): Promise<void> {
        await this.landmarksService.delete(landmarkId);
    }
}
