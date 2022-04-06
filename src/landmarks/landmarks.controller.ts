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
        private readonly landmarkService: LandmarksService
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [LandmarkDTO],
        description: 'Returns the full list of Landmarks'
    })
    async getLandmarks(): Promise<LandmarkDTO[]> {
        const landmarks = await this.landmarkService.getAll();
        return landmarks.map(landmark => LandmarkConverter.convertToDto(landmark)); 
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returned the single Landmarks by ID'
    })
    async getLandmarkById(
        @Param('id') landmarkId: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarkService.getSingleById(landmarkId);
        return LandmarkConverter.convertToDto(landmark);
    }

    @Get('by-slug/:slug')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returned the single Landmarks by slug'
    })
    async getLandmarkBySlug(
        @Param('slug') landmarkSlug: string
    ): Promise<LandmarkDTO> {
        const landmark = await this.landmarkService.getSingleBySlug(landmarkSlug);
        return LandmarkConverter.convertToDto(landmark);
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        type: LandmarkDTO,
        description: 'Returned the created Landmark object'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    async addLandmark(
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarkService.validateBodyData(body);
        const newLandmark = await this.landmarkService.insert(validatedBody);
        return LandmarkConverter.convertToDto(newLandmark);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        type: LandmarkDTO,
        description: 'Returned the updated Landmark object'
    })
    @ApiBody({
        type: LandmarkCreateUpdateDTO
    })
    async updateLandmark(
        @Param('id') landmarkId: string,
        @Body() body: LandmarkCreateUpdateDTO
    ): Promise<LandmarkDTO> {
        const validatedBody = await this.landmarkService.validateBodyData(body);
        const updatedLandmark = await this.landmarkService.update(landmarkId, validatedBody);
        return LandmarkConverter.convertToDto(updatedLandmark);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deleted Landmark object by ID'
    })
    async delete(
        @Param('id') landmarkId: string
    ): Promise<void> {
        await this.landmarkService.delete(landmarkId);
    }
}
