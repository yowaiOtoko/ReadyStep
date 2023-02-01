<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230201102040 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE app_session (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_3D1955995E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_task (id INT AUTO_INCREMENT NOT NULL, session_id INT DEFAULT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_5750FE85613FECDF (session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_user (id INT AUTO_INCREMENT NOT NULL, session_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_88BDF3E95E237E06 (name), INDEX IDX_88BDF3E9613FECDF (session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_user_task (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, task_id INT DEFAULT NULL, session_id INT DEFAULT NULL, completed TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', completed_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_8090C8D9A76ED395 (user_id), INDEX IDX_8090C8D98DB60186 (task_id), INDEX IDX_8090C8D9613FECDF (session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE artist (id INT AUTO_INCREMENT NOT NULL, genre_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_15996874296D31F (genre_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE genre (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE app_task ADD CONSTRAINT FK_5750FE85613FECDF FOREIGN KEY (session_id) REFERENCES app_session (id)');
        $this->addSql('ALTER TABLE app_user ADD CONSTRAINT FK_88BDF3E9613FECDF FOREIGN KEY (session_id) REFERENCES app_session (id)');
        $this->addSql('ALTER TABLE app_user_task ADD CONSTRAINT FK_8090C8D9A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('ALTER TABLE app_user_task ADD CONSTRAINT FK_8090C8D98DB60186 FOREIGN KEY (task_id) REFERENCES app_task (id)');
        $this->addSql('ALTER TABLE app_user_task ADD CONSTRAINT FK_8090C8D9613FECDF FOREIGN KEY (session_id) REFERENCES app_session (id)');
        $this->addSql('ALTER TABLE artist ADD CONSTRAINT FK_15996874296D31F FOREIGN KEY (genre_id) REFERENCES genre (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE app_task DROP FOREIGN KEY FK_5750FE85613FECDF');
        $this->addSql('ALTER TABLE app_user DROP FOREIGN KEY FK_88BDF3E9613FECDF');
        $this->addSql('ALTER TABLE app_user_task DROP FOREIGN KEY FK_8090C8D9A76ED395');
        $this->addSql('ALTER TABLE app_user_task DROP FOREIGN KEY FK_8090C8D98DB60186');
        $this->addSql('ALTER TABLE app_user_task DROP FOREIGN KEY FK_8090C8D9613FECDF');
        $this->addSql('ALTER TABLE artist DROP FOREIGN KEY FK_15996874296D31F');
        $this->addSql('DROP TABLE app_session');
        $this->addSql('DROP TABLE app_task');
        $this->addSql('DROP TABLE app_user');
        $this->addSql('DROP TABLE app_user_task');
        $this->addSql('DROP TABLE artist');
        $this->addSql('DROP TABLE genre');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
