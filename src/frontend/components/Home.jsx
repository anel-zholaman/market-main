import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

const Home = ({ marketplace, nft, mytoken, account }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async() => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                    // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                    // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                    // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                })
            }
        }
        setLoading(false)
        setItems(items)
    }

    const buyMarketItem = async(item) => {
        await (await marketplace.purchaseItem(item.itemId, mytoken.address)).wait()
        loadMarketplaceItems()
    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [])
    if (loading) return ( <
        main style = {
            { padding: "1rem 0" } } >
        <
        h2 > Loading... < /h2> <
        /main>
    )
    return (
      <div className="flex justify-center">
        {items.length > 0 ?
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {items.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <div className="card-img">
                      <Card.Img variant="top" src={item.image} />
                    </div>
                    
                    <Card.Body color="secondary">
                      <div className="top">
                        <div className="card-name">
                          <div className="card-of-name">NFT Name</div>
                          <Card.Text>{item.name}</Card.Text>
                          </div>
                          <div className="card-price">
                        <div className="card-of-name">
                          Price
                        </div>
                        <Card.Text>
                        {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Card.Text>
                      </div>
                      </div>
                      <div className="top">
                        <div className="card-name">
                          <div className="card-of-name">Description</div>
                          <Card.Text>{item.description}</Card.Text>
                          </div>
                          <div className="card-price">
                        <div className="card-of-name">
                          Owner
                        </div>
                        <Card.Text>
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Card.Text>
                      </div>
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <div className='d-grid'>
                        <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                          Buy
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2>Nothing here...</h2>
            </main>
          )}
      </div>
    );
  }
  export default Home