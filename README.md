# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|paaword|string|null: false|
|username|string|null: false|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :chats
- has_many :groups, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: ture|

### Association
- belongs_to :user
- has_many :photos

## photosテーブル

|Column|Type|Options|
|------|----|-------|
|chats_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: chats

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

