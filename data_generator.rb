arr = []

N = 200
K = 6

# N.times do
#   arr.push(rand(150000..2000000).to_s)
# end
N.times do
  arr.push(rand(1..1100).to_s)
end

str = arr.join(" ")

File.open("test-input.txt", "w") do |f|
  f.puts N.to_s + " " + K.to_s
  f.puts str
end
