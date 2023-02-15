<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230211045633 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE task_list_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE task_list (id INT NOT NULL, created_by_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_377B6C63B03A8386 ON task_list (created_by_id)');
        $this->addSql('COMMENT ON COLUMN task_list.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE task_list ADD CONSTRAINT FK_377B6C63B03A8386 FOREIGN KEY (created_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE app_task ADD task_list_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE app_task ADD CONSTRAINT FK_5750FE85224F3C61 FOREIGN KEY (task_list_id) REFERENCES task_list (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_5750FE85224F3C61 ON app_task (task_list_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE app_task DROP CONSTRAINT FK_5750FE85224F3C61');
        $this->addSql('DROP SEQUENCE task_list_id_seq CASCADE');
        $this->addSql('ALTER TABLE task_list DROP CONSTRAINT FK_377B6C63B03A8386');
        $this->addSql('DROP TABLE task_list');
        $this->addSql('DROP INDEX IDX_5750FE85224F3C61');
        $this->addSql('ALTER TABLE app_task DROP task_list_id');
    }
}
