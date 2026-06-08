import { execFileSync } from "node:child_process";

const run = (command, args) => {
  console.log(`\n> ${command} ${args.join(" ")}`);
  if (command === "npm.cmd") {
    execFileSync("cmd.exe", ["/c", command, ...args], { stdio: "inherit" });
    return;
  }
  execFileSync(command, args, { stdio: "inherit" });
};

const output = (command, args) =>
  execFileSync(command, args, { encoding: "utf8" }).trim();

const hasRemote = () => {
  try {
    return Boolean(output("git", ["remote", "get-url", "origin"]));
  } catch {
    return false;
  }
};

if (!hasRemote()) {
  console.error(
    "\nGitHub 원격 저장소가 아직 연결되어 있지 않습니다.\n" +
      "먼저 실행하세요:\n" +
      "git remote add origin https://github.com/사용자명/저장소명.git\n",
  );
  process.exit(1);
}

run("npm.cmd", ["test"]);
run("npm.cmd", ["run", "build"]);
run("git", ["add", "."]);

const status = output("git", ["status", "--porcelain"]);
if (!status) {
  console.log("\n변경된 파일이 없어 커밋할 내용이 없습니다.");
  process.exit(0);
}

const stamp = new Date().toISOString().replace("T", " ").slice(0, 16);
run("git", ["commit", "-m", `Update tour app ${stamp}`]);
run("git", ["push", "origin", "main"]);

console.log(
  "\nGitHub로 push했습니다. GitHub Actions가 자동으로 Pages 배포를 시작합니다.",
);
