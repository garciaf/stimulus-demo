
class CountriesController < ApplicationController
  rescue_from HTTParty::ResponseError, with: :not_found

  def index
    @countries = []
    @countries = client.translations(params[:search]) if params[:search].present?
    @countries = @countries
                  .reject { |c| c["capital"].blank? }
                  .reject { |c| c["flags"].blank? }
  end

  def not_found
    render :not_found, status: :not_found
  end

  private

  def client
    @client ||= CountryApi.new
  end

  def filter_params
    params.fetch(:country, {}).permit(:name)
  end
end
