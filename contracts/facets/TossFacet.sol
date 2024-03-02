// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/Context.sol";

import "../libraries/LibDiamond.sol";
contract TossFacet is Context {
	
	enum Toss { Head, Tail }
	uint private nonce = 0; // Nonce to ensure different results for subsequent calls
	
	mapping(uint256 => Toss) public tossResults;
	// --- all contract events listed here
	
	// when token deployed by hot wallet/admin this event will be emitted
	event Tossed(
		uint256 indexed requestId, // request id
		Toss result
	);
	
	// --- end of events



	/**
	* here user will initiate this function to get randomly tossed result.
    */
	function toss(uint256 requestId) external {
		require(requestId != 0, "Invalid request id");
		bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce));
		uint random = uint(hash) % 2;
		nonce++; // Increment nonce for the next call
		Toss tossResult = random == 1 ? Toss.Head : Toss.Tail;
	
		tossResults[requestId] = tossResult;
		emit Tossed(
			requestId, // request id
			tossResult
		);
	} // end of initiate token deployment
	
} // end of contract
