{
  description = "Dev Environment for Loomio Docs: help.loomio.com";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            mdbook # 0.5.2
          ];

          shellHook = ''
            echo "🔧 Loomio Docs Dev Environment"
          '';
        };
      });
}
