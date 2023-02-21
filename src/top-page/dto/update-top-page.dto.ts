import { PartialType } from '@nestjs/mapped-types';
import { CreateTopPageDto } from './create-top-page.dto';

export class UpdateTopPageDto extends PartialType(CreateTopPageDto) {}
