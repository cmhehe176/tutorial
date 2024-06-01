import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix21717213976057 implements MigrationInterface {
    name = 'Fix21717213976057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP FOREIGN KEY \`FK_3a6b695bdf49370f48274698cf4\``);
        await queryRunner.query(`DROP INDEX \`REL_3a6b695bdf49370f48274698cf\` ON \`subjects\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`classId\` \`class_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD UNIQUE INDEX \`IDX_275ac71cfea88470f4baae99c3\` (\`class_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_275ac71cfea88470f4baae99c3\` ON \`subjects\` (\`class_id\`)`);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD CONSTRAINT \`FK_275ac71cfea88470f4baae99c36\` FOREIGN KEY (\`class_id\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP FOREIGN KEY \`FK_275ac71cfea88470f4baae99c36\``);
        await queryRunner.query(`DROP INDEX \`REL_275ac71cfea88470f4baae99c3\` ON \`subjects\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP INDEX \`IDX_275ac71cfea88470f4baae99c3\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`class_id\` \`classId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3a6b695bdf49370f48274698cf\` ON \`subjects\` (\`classId\`)`);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD CONSTRAINT \`FK_3a6b695bdf49370f48274698cf4\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
