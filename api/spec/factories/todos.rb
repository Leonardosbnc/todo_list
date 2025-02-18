FactoryBot.define do
  factory :todo do
    name { Faker::Name.first_name }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    status { "pending" }
    user factory: :user
  end
end
