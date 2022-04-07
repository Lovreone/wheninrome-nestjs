import { CityCreateUpdateDTO } from './city-create-update.dto';
import { CityConverter } from './city.converter';
import { CityDTO } from './city.dto';
import { CitiesService } from './cities.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Delete, HttpCode, Param, Patch, Body, Post } from '@nestjs/common';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
    constructor(
        private citiesService: CitiesService
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [CityDTO],
        description: 'Returns the full list of City documents'
    })
    async getCities(): Promise<CityDTO[]> {
        const cities = await this.citiesService.getAll();
        return cities.map(city => CityConverter.convertToDto(city)); 
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned a single City document document by ID'
    })
    async getCityById(
        @Param('id') cityId: string
    ): Promise<CityDTO> {
        const city = await this.citiesService.getSingleById(cityId);
        return CityConverter.convertToDto(city);
    }

    @Get('by-slug/:slug')
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned a single City document by slug'
    })
    async getCityBySlug(
        @Param('slug') citySlug: string
    ): Promise<CityDTO> {
        const city = await this.citiesService.getSingleBySlug(citySlug);
        return CityConverter.convertToDto(city);
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        type: CityDTO,
        description: 'Returned the created City document'
    })
    @ApiBody({
        type: CityCreateUpdateDTO
    })
    async createCity(
        @Body() body: CityCreateUpdateDTO
    ): Promise<CityDTO> {
        const validatedBody = await this.citiesService.validateBodyData(body);
        const newCity = await this.citiesService.insert(validatedBody);
        return CityConverter.convertToDto(newCity);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        type: CityDTO,
        description: 'Returned the updated City document'
    })
    @ApiBody({
        type: CityCreateUpdateDTO
    })
    async updateCity(
        @Param('id') cityId: string,
        @Body() body: CityCreateUpdateDTO
    ): Promise<CityDTO> {
        const validatedBody = await this.citiesService.validateBodyData(body);
        const updatedCity = await this.citiesService.update(cityId, validatedBody);
        return CityConverter.convertToDto(updatedCity);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deleted City document by ID'
    })
    async deleteCity(
        @Param('id') cityId: string
    ): Promise<void> {
        // TODO: Decide if this should be available to the admin or not
        await this.citiesService.delete(cityId);
    }
}
