import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1717213929774 implements MigrationInterface {
    name = 'Fix1717213929774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_2c2897c87a5839e7c6dfb738af3\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_55869ee83e8b89f597c776aafa1\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_dd48c4223ae77de291c0e2dba22\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd48c4223ae77de291c0e2dba2\` ON \`role\``);
        await queryRunner.query(`DROP INDEX \`REL_dd48c4223ae77de291c0e2dba2\` ON \`role\``);
        await queryRunner.query(`CREATE TABLE \`subjects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`descripton\` text NOT NULL, \`classId\` int NULL, UNIQUE INDEX \`REL_3a6b695bdf49370f48274698cf\` (\`classId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`times\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`start_time\` timestamp NOT NULL, \`end_time\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`create_at\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`delete_at\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`descripton\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`classId\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`start_time\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD CONSTRAINT \`FK_3a6b695bdf49370f48274698cf4\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_2c2897c87a5839e7c6dfb738af3\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_55869ee83e8b89f597c776aafa1\` FOREIGN KEY (\`time_id\`) REFERENCES \`times\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_55869ee83e8b89f597c776aafa1\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_2c2897c87a5839e7c6dfb738af3\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP FOREIGN KEY \`FK_3a6b695bdf49370f48274698cf4\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`end_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`start_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`classId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`descripton\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`delete_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`times\``);
        await queryRunner.query(`DROP INDEX \`REL_3a6b695bdf49370f48274698cf\` ON \`subjects\``);
        await queryRunner.query(`DROP TABLE \`subjects\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_dd48c4223ae77de291c0e2dba2\` ON \`role\` (\`classId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_dd48c4223ae77de291c0e2dba2\` ON \`role\` (\`classId\`)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD CONSTRAINT \`FK_dd48c4223ae77de291c0e2dba22\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_55869ee83e8b89f597c776aafa1\` FOREIGN KEY (\`time_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_2c2897c87a5839e7c6dfb738af3\` FOREIGN KEY (\`subject_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
