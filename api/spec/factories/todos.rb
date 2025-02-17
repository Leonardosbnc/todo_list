FactoryBot.define do
  factory :todo do
    name { Faker::Name.first_name }
    status { "pending" }
    user factory: :user
  end
end
