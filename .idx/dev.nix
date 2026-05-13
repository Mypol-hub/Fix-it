{ pkgs, ... }: {
  channel = "stable-24.05"; # Ensures we use a modern package set
  packages = [
    pkgs.nodejs_22           # Fixes the Node version error
    pkgs.nodePackages.npm
  ];
  idx = {
    extensions = [ "dsznajder.es7-react-js-snippets" ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "--prefix" "admin-app" "run" "dev" "--" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
