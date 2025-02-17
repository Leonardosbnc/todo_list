class Todo < ApplicationRecord
  belongs_to :user
  validates :name, :user_id, :slug, presence: true

  before_validation :set_slug, on: :create
  validate :unique_slug_for_user, on: :create

  enum :status, { pending: 'pending', completed: 'completed' }, default: :pending, validate: true

  def set_slug
    self.slug = self.name.parameterize
  end

  def unique_slug_for_user
    exists_todo = self.user.todos.select { |t| t.slug == self.slug and t.id != self.id }.count > 0
    if exists_todo
      errors.add(:base, 'Found To-do with same name')
    end
  end
end
