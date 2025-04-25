{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {system = system;};
      in {
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.biome
            pkgs.bun
            pkgs.just
            pkgs.nodejs-slim_23
            pkgs.typescript
            pkgs.typescript-language-server
          ];
        };
      }
    );
}
