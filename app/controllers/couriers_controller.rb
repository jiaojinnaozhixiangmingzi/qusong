class CouriersController < ApplicationController
  before_action :set_courier, only: [:show, :edit, :update, :destroy]

  # GET /couriers
  # GET /couriers.json
  def index
    @couriers = Courier.all
  end

  # GET /couriers/1
  # GET /couriers/1.json
  def show
  end

  # GET /couriers/new
  def new
    @courier = Courier.new
  end

  # GET /couriers/1/edit
  def edit
  end

  # POST /couriers
  # POST /couriers.json
  def create
    @courier = Courier.new(courier_create_params)

    respond_to do |format|
      if @courier.save
        format.html { redirect_to @courier, notice: 'Courier was successfully created.' }
        format.json { render :json => {:data => "succ"}.to_json }
      else
        format.html { render :new }
        format.json { render :json => {:data => "failed"}.to_json }
      end
    end
  end

  # PATCH/PUT /couriers/1
  # PATCH/PUT /couriers/1.json
  def update
    respond_to do |format|
      if @courier.update(courier_params)
        format.html { redirect_to @courier, notice: 'Courier was successfully updated.' }
        format.json { render :show, status: :ok, location: @courier }
      else
        format.html { render :edit }
        format.json { render json: @courier.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /couriers/1
  # DELETE /couriers/1.json
  def destroy
    @courier.destroy
    respond_to do |format|
      format.html { redirect_to couriers_url, notice: 'Courier was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def login
    @courier = Courier.where(["mobile = ? and encrypted_password = ?", params[:mobile], params[:encrypted_password]])

    respond_to do |format|
      if @courier.empty?
        format.json { render :json => {:data => "Login failed"}.to_json}
      else
        first = @courier[0]
        if first.status == 1
          format.json { render :json => {:data => "Login succ"}.to_json}
        else
          format.json { render :json => {:data => "Need activate"}.to_json}
        end
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_courier
      @courier = Courier.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def courier_params
      params.fetch(:courier, {})
    end

    def courier_create_params
      params.require(:courier).permit(:mobile, :encrypted_password, :email, :name, :status)
    end

end
