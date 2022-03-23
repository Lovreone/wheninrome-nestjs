import { NotFoundException } from '@nestjs/common';

export function sendNotFound(message = 'Not Found') {
    throw new NotFoundException({message: message});
}
