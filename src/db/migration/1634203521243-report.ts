import {MigrationInterface, QueryRunner} from 'typeorm';

export class Report1634203521243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS report (
                id SERIAL PRIMARY KEY,
                create_time TIMESTAMPTZ,
                auth_method VARCHAR,
                verifier_id VARCHAR,
                verifier_user_id VARCHAR,
                request_id VARCHAR,
                session_id VARCHAR,
                result_code VARCHAR,
                success BOOLEAN
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS report;
        `);
    }

}
