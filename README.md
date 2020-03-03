# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique:true|
|password|string|null: false|
|name|string|null: false, index:true|
### Association
- has_many :groups_users
- has_many :messages
- has many:groups, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: ture|
### Association
- has_many :messages
- has_many  :users,  through:  :users_groups
- has_many :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
