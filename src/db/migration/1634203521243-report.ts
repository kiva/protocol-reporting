import {MigrationInterface, QueryRunner} from 'typeorm';

export class Report1634203521243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS report (
                id SERIAL PRIMARY KEY,
                create_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                auth_method VARCHAR,
                verifier_id VARCHAR,
                verifier_user_id VARCHAR,
                request_id VARCHAR UNIQUE,
                session_id VARCHAR,
                result_code VARCHAR,
                success BOOLEAN
            );`
        );
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_create_time ON report(create_time);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_auth_method ON report(auth_method);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_verifier_id ON report(verifier_id);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_verifier_user_id ON report(verifier_user_id);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_session_id ON report(session_id);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_result_code ON report(result_code);');
        queryRunner.query('CREATE INDEX IF NOT EXISTS idx_success ON report(success);');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS report;
        `);
        queryRunner.query('DROP INDEX IF EXISTS idx_create_time;');
        queryRunner.query('DROP INDEX IF EXISTS idx_auth_method;');
        queryRunner.query('DROP INDEX IF EXISTS idx_verifier_id;');
        queryRunner.query('DROP INDEX IF EXISTS idx_verifier_user_id;');
        queryRunner.query('DROP INDEX IF EXISTS idx_session_id;');
        queryRunner.query('DROP INDEX IF EXISTS idx_result_code;');
        queryRunner.query('DROP INDEX IF EXISTS idx_success;');
    }

}
