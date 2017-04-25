arr = []

N = 2000000
K = 20

N.times do
  arr.push(rand(1..10).to_s)
end

str = arr.join(" ")


File.open("test-input.txt", "w") do |f|
  f.puts N.to_s + " " + K.to_s
  f.puts str
end
