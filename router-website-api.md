GET home page:
http://localhost:3000
http://localhost:3000/api/products

pagination:
http://localhost:3000/?skip=0&limit=10
http://localhost:3000/?skip=10&limit=20

http://localhost:3000/api/products?skip=0&limit=10
http://localhost:3000/api/products?skip=10&limit=20

order:
http://localhost:3000/?sort=name
http://localhost:3000/?sort=-name
http://localhost:3000/?sort=price
http://localhost:3000/?sort=-price

http://localhost:3000/api/products?sort=name
http://localhost:3000/api/products?sort=-name
http://localhost:3000/api/products?sort=price
http://localhost:3000/api/products?sort=-price

search by field: mmm estos filtros no me quedan muy claro en el frontend:
http://localhost:3000/?fields=name
http://localhost:3000/?fields=price
http://localhost:3000/?fields=tags

http://localhost:3000/api/products?fields=name
http://localhost:3000/api/products?fields=price
http://localhost:3000/api/products?fields=tags

Filter by name:
http://localhost:3000/?name=b
http://localhost:3000/?name=x
http://localhost:3000/?name=bicycle
http://localhost:3000/?name=xbox

http://localhost:3000/api/products?name=b
http://localhost:3000/api/products?name=x
http://localhost:3000/api/products?name=bicycle
http://localhost:3000/api/products?name=xbox

Filter by sale:
http://localhost:3000/?sale=yes
http://localhost:3000/?sale=no

http://localhost:3000/api/products?sale=yes
http://localhost:3000/api/products?sale=no

Filter by exact price:
http://localhost:3000/?price=499
http://localhost:3000/api/produts?price=499

Greater than that price:
http://localhost:3000/?minPrice=100&maxPrice=1500
http://localhost:3000/?minPrice=100
http://localhost:3000/?maxPrice=1500

http://localhost:3000/api/products?minPrice=100&maxPrice=1500
http://localhost:3000/api/products?minPrice=100
http://localhost:3000/api/products?maxPrice=1500

Filter by tag:
http://localhost:3000/?tag=mobile
http://localhost:3000/?tag=motor
http://localhost:3000/?tag=lifestyle
http://localhost:3000/?tag=work

http://localhost:3000/api/products?tag=mobile
http://localhost:3000/api/products?tag=motor
http://localhost:3000/api/products?tag=lifestyle
http://localhost:3000/api/products?tag=work

http://localhost:3000/api/products?tag=mobile&sale=yes&name=i&price=50
http://localhost:3000/api/products?tag=mobile&name=c&sale=yes
