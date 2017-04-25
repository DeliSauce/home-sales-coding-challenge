arr = []

N = 4000
K = 100

N.times do
  arr.push(rand(1..1000).to_s)
end

str = arr.join(" ")

File.open("test-input.txt", "w") do |f|
  f.puts N.to_s + " " + K.to_s
  f.puts str
end
