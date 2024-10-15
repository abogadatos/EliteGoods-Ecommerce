import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameRefactor1721888604390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "price" TO "cost"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "cost" TO "price"`,
    );
  }
}
