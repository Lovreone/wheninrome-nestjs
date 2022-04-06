import { NotFoundException, ForbiddenException } from '@nestjs/common';

export function sendNotFound(message = 'Not found'): void {
    throw new NotFoundException({message: message});
}

export function sendForbidden(message = 'Operation forbidden'): void {
    throw new ForbiddenException({message: [message]});
}
