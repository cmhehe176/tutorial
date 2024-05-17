import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1715935240423 implements MigrationInterface {
  name = 'Init1715935240423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admins\` CHANGE \`role\` \`role_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`alias\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe3119b8577cd8704656ee51d0\` (\`alias\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`admins\` DROP COLUMN \`role_id\``);
    await queryRunner.query(`ALTER TABLE \`admins\` ADD \`role_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_5733c73cd81c566a90cc4802f96\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_5733c73cd81c566a90cc4802f96\``,
    );
    await queryRunner.query(`ALTER TABLE \`admins\` DROP COLUMN \`role_id\``);
    await queryRunner.query(
      `ALTER TABLE \`admins\` ADD \`role_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe3119b8577cd8704656ee51d0\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`admins\` CHANGE \`role_id\` \`role\` varchar(255) NOT NULL`,
    );
  }
}
