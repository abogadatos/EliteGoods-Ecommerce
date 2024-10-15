import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  //   Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../users/cloudinary.service';
import { MinSizeValidatorPipe } from 'src/pipes/minSizeValidator.pipe';
import { UploadApiResponse } from 'cloudinary';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('FILES')
@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileService: FileUploadService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFile(file);
  }

  @Post('uploadImage/:id')
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UsePipes(MinSizeValidatorPipe)
  async fileUpload(
    @Param('id', ParseUUIDPipe) productID: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // TODO REPAIRT THIS, CHECK
            message: 'the file size must be less than 100 kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('it cannot be empty');
    const imgData: UploadApiResponse =
      await this.cloudinaryService.uploadImage(file);
    return await this.fileService.updateImage(productID, imgData);
  }
}
