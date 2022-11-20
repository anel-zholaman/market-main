import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import market from './market.png'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" variant="dark">
            <Container>
<Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="">
                                <Button variant="">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button className="navbarbtn" onClick={web3Handler} variant="">Connect <img src="https://img.icons8.com/color/48/null/metamask-logo.png"/></Button>
                        )}
                    </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Nav className="">
                        <Nav.Link as={Link} to="/"><div className="nav-icons">
                        <img src="https://img.icons8.com/color/48/null/stall.png"/></div> Market</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases"> <div className="nav-icons nav-icons-spec">
                        <img src="https://img.icons8.com/neon/96/null/experimental-shopping-basket-2-neon.png"/></div>Purchases</Nav.Link>
                        <Nav.Link as={Link} to="/create"><div className="nav-icons">
                        <img src="https://img.icons8.com/office/16/null/minecraft-pickaxe.png"/></div>Craft</Nav.Link>
                    </Nav>
                    

            </Container>
        </Navbar>
    )

}

export default Navigation;