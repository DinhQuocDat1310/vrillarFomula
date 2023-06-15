import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create.dto';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {}
