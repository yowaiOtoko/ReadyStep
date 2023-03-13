<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230312231509 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE task_activity_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE task_activity_media_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE task_session_task_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE app_user (id SERIAL NOT NULL, session_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_88BDF3E95E237E06 ON app_user (name)');
        $this->addSql('CREATE INDEX IDX_88BDF3E9613FECDF ON app_user (session_id)');
        $this->addSql('CREATE TABLE task_activity (id INT NOT NULL, created_by_id INT DEFAULT NULL, instruction_file_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, instruction_text TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_ECB4E316B03A8386 ON task_activity (created_by_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_ECB4E316E44E2E3E ON task_activity (instruction_file_id)');
        $this->addSql('COMMENT ON COLUMN task_activity.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE task_activity_media (id INT NOT NULL, activity_id INT DEFAULT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6807E11081C06096 ON task_activity_media (activity_id)');
        $this->addSql('CREATE TABLE task_session (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CFA5FF3E5E237E06 ON task_session (name)');
        $this->addSql('COMMENT ON COLUMN task_session.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE task_session_task (id INT NOT NULL, session_id INT DEFAULT NULL, task_id INT NOT NULL, started_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, ended_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5C9EFF22613FECDF ON task_session_task (session_id)');
        $this->addSql('CREATE INDEX IDX_5C9EFF228DB60186 ON task_session_task (task_id)');
        $this->addSql('COMMENT ON COLUMN task_session_task.started_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN task_session_task.ended_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN task_session_task.duration IS \'(DC2Type:dateinterval)\'');
        $this->addSql('CREATE TABLE task_task (id SERIAL NOT NULL, activity_id INT DEFAULT NULL, parent_task_id INT DEFAULT NULL, description TEXT DEFAULT NULL, label VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_21CD4F5E81C06096 ON task_task (activity_id)');
        $this->addSql('CREATE INDEX IDX_21CD4F5EFFFE75C0 ON task_task (parent_task_id)');
        $this->addSql('CREATE TABLE task_user_task (id SERIAL NOT NULL, user_id INT DEFAULT NULL, task_id INT DEFAULT NULL, session_id INT DEFAULT NULL, completed BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, completed_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_57D55ABDA76ED395 ON task_user_task (user_id)');
        $this->addSql('CREATE INDEX IDX_57D55ABD8DB60186 ON task_user_task (task_id)');
        $this->addSql('CREATE INDEX IDX_57D55ABD613FECDF ON task_user_task (session_id)');
        $this->addSql('COMMENT ON COLUMN task_user_task.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN task_user_task.completed_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE app_user ADD CONSTRAINT FK_88BDF3E9613FECDF FOREIGN KEY (session_id) REFERENCES task_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_activity ADD CONSTRAINT FK_ECB4E316B03A8386 FOREIGN KEY (created_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_activity ADD CONSTRAINT FK_ECB4E316E44E2E3E FOREIGN KEY (instruction_file_id) REFERENCES task_activity_media (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_activity_media ADD CONSTRAINT FK_6807E11081C06096 FOREIGN KEY (activity_id) REFERENCES task_activity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_session_task ADD CONSTRAINT FK_5C9EFF22613FECDF FOREIGN KEY (session_id) REFERENCES task_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_session_task ADD CONSTRAINT FK_5C9EFF228DB60186 FOREIGN KEY (task_id) REFERENCES task_task (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_task ADD CONSTRAINT FK_21CD4F5E81C06096 FOREIGN KEY (activity_id) REFERENCES task_activity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_task ADD CONSTRAINT FK_21CD4F5EFFFE75C0 FOREIGN KEY (parent_task_id) REFERENCES task_task (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_user_task ADD CONSTRAINT FK_57D55ABDA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_user_task ADD CONSTRAINT FK_57D55ABD8DB60186 FOREIGN KEY (task_id) REFERENCES task_task (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_user_task ADD CONSTRAINT FK_57D55ABD613FECDF FOREIGN KEY (session_id) REFERENCES task_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE task_activity_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE task_activity_media_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE task_session_task_id_seq CASCADE');
        $this->addSql('ALTER TABLE app_user DROP CONSTRAINT FK_88BDF3E9613FECDF');
        $this->addSql('ALTER TABLE task_activity DROP CONSTRAINT FK_ECB4E316B03A8386');
        $this->addSql('ALTER TABLE task_activity DROP CONSTRAINT FK_ECB4E316E44E2E3E');
        $this->addSql('ALTER TABLE task_activity_media DROP CONSTRAINT FK_6807E11081C06096');
        $this->addSql('ALTER TABLE task_session_task DROP CONSTRAINT FK_5C9EFF22613FECDF');
        $this->addSql('ALTER TABLE task_session_task DROP CONSTRAINT FK_5C9EFF228DB60186');
        $this->addSql('ALTER TABLE task_task DROP CONSTRAINT FK_21CD4F5E81C06096');
        $this->addSql('ALTER TABLE task_task DROP CONSTRAINT FK_21CD4F5EFFFE75C0');
        $this->addSql('ALTER TABLE task_user_task DROP CONSTRAINT FK_57D55ABDA76ED395');
        $this->addSql('ALTER TABLE task_user_task DROP CONSTRAINT FK_57D55ABD8DB60186');
        $this->addSql('ALTER TABLE task_user_task DROP CONSTRAINT FK_57D55ABD613FECDF');
        $this->addSql('DROP TABLE app_user');
        $this->addSql('DROP TABLE task_activity');
        $this->addSql('DROP TABLE task_activity_media');
        $this->addSql('DROP TABLE task_session');
        $this->addSql('DROP TABLE task_session_task');
        $this->addSql('DROP TABLE task_task');
        $this->addSql('DROP TABLE task_user_task');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
