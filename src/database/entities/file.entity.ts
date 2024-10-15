import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * -Name of the form field where the file was uploaded
   *
   * @example "profilePicture"
   */
  @Column()
  fieldName: string;

  /**
   * -MIME type of the file
   *
   * @example "image/jpeg"
   */
  @Column()
  mimeType: string;

  /**
   * -Binary data of the file. This should be a Base64 encoded string.
   *
   * @example "'SGVsbG8sIFdvcmxkIQ=='""
   */
  @Column({ type: 'bytea' })
  data: Buffer;
}
