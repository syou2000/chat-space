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
|username|string|null: false, add_index:true|
### Association
- has_many :groups_users
- has_many :messages
- has many:groups, through: groups_users|

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|image|mediumblob|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: ture|
### Association
- has_many :message
- has_many  :users,  through:  :users_groups
- has_many :users_group

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
