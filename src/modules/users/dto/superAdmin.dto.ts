import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Data Transfer Object for Super Admin Authentication.
 *
 * This DTO ensures that super admin credentials meet all necessary validation requirements.
 */
export class superAdminDTO {
  /**
   * Super Admin's email address.
   *
   * - This field is required.
   *
   * @example "super@email.com"
   */
  @IsString()
  @ApiProperty({
    description: 'The email address of the Super Admin.',
    example: 'super@email.com',
  })
  email: string;

  /**
   * Super Admin's password.
   *
   * - This field is required.
   * - Should be a string.
   *
   * @example "th1s1S@pssWd"
   */
  @IsString()
  @ApiProperty({
    description: 'The password for Super Admin login.',
    example: 'th1s1S@pssWd',
  })
  password: string;
}
