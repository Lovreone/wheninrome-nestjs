import { ToursService } from './tours.service';
import { Controller } from '@nestjs/common';

@Controller('tours')
export class ToursController {
    constructor(
        private toursService: ToursService
    ) {}
}
