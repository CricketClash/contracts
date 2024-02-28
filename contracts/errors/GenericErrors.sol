// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error AlreadyInitialized();
error CannotAuthoriseSelf();
error ContractCallNotAllowed();
error CumulativeSlippageTooHigh(uint256 minAmount, uint256 receivedAmount);
error ExternalCallFailed();
error InformationMismatch();
error InsufficientBalance(uint256 required, uint256 balance);
error InvalidAmount();
error InvalidCallData();
error InvalidConfig();
error InvalidContract();
error InvalidFallbackAddress();
error InvalidReceiver();
error NotAContract();
error NotInitialized();
error OnlyContractOwner();
error ReentrancyError();
error TokenNotSupported();
error UnAuthorized();
error UnsupportedChainId(uint256 chainId);
error ZeroAmount();
