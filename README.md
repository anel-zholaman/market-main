# market-main
1. Download the repository

2. Install the dependencies:

		$ cd market-main
		$ npm install

3. Start the local blockchain network:
		$ npx hardhat node

4. Connect your metamask wallet to the network:

		Copy the private address key and import it into metamask
		Connect your metamask to the network hardhat: "127.0.0.1:8545", chainID: "31337".

5. Run the "deploy.js" file to deploy all smart contracts:
		
		$ npx hardhat run src/backend/scripts/deploy.js --network localhost

6. Run the project:
		
		$ npm run start
		

Usage

On the Create page we can create an NFT and put it up for sale. To do this we need to 1. Upload a picture in any format. 2. Enter data about title, description and price. 3. Click on the button "create". Next you need to confirm all requests from metamask.

Next, on the Home page we should see all NFTs available for sale. There we can buy one of them by clicking on the button "buy".

On page MylistedItems we can see all our NFTs (sold and not yet)

On the page MyPurchases all NFTs you bought will be there.

![image](https://user-images.githubusercontent.com/53651915/202922420-12a34beb-6591-4e38-b8be-402b081b8b07.png)
![image](https://user-images.githubusercontent.com/53651915/202922451-c9d839d2-e0df-4e5f-bdd3-bbbc8951d30a.png)
