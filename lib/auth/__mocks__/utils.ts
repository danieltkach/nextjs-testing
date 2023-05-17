module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy Typescript
export {};

// mock module in test file using this code
// jest.mock("@/lib/auth/utils");
