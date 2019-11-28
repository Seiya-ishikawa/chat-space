class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :group
  belongs_to :user
  with_options presence: true do
    validates :text
    validates :image
  end
end
