import { NotFoundException, ForbiddenException } from '@nestjs/common';

export function sendForbidden(message = 'Operation forbidden'): void {
    throw new ForbiddenException({message: [message]});
}
