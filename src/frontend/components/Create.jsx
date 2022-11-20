import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button, Col } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer'

const projectId = '2HRaSDeMsGpHbfNGFfvm4xoW1Q0'; // <---------- your Infura Project ID

const projectSecret = '4b4b5259e8512b463ea6efc377342387'; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
  host: 'infura-ipfs.io',
  protocol: 'https',
  port:5001,
  headers: {
    authorization: auth,
  },
});
const Create = ({ marketplace, nft, mytoken }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://openclade.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://openclade.infura-ipfs.io/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait() 
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft and tokens
    await(await mytoken.increaseAllowance(marketplace.address, "9999999999999999999999999")).wait()
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }

  return (
    <div className="container-fluid">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
          <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setName(e.target.value)} plaintext size="lg" required type="text" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setDescription(e.target.value)} plaintext size="lg" required as="textarea"/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
        <Form.Label column sm="2">
          Price ETH
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setPrice(e.target.value)} plaintext size="lg" required type="number"/>
        </Col>
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Control type="file" size="sm" required
                name="file"
                onChange={uploadToIPFS}/>
      </Form.Group>
      <Button onClick={createNFT} variant="primary" size="lg" >
                  Craft NFT
                </Button>
    </Form>
          </div>
        </main>
      </div>
  );
}

export default Create