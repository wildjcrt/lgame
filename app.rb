require "sinatra"

set :root, File.dirname(__FILE__)

get "/" do
  erb :index
end