require "ostruct"

class CountryApi
  include HTTParty
  base_uri "https://restcountries.com/v3.1"
  format :json

  raise_on [ 404, 500, "5[0-9]*" ]

  def translations(country)
    self.class.get("/translation/#{country}")
  end
end
