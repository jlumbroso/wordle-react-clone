// allows import of .txt files in TypeScript
declare module "*.txt" {
    const content: any;
    export default content;
}
