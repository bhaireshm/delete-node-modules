# Delete Node Modules (`dnm`)

This script deletes `node_modules` folders from a given directory and its subdirectories. It can also delete all contents of a directory if specified.

## Features

- Zero dependencies
- Delete only `node_modules` folders.
- Delete all contents of a directory.
- Exclude the current project's `node_modules` folder.

### Installation

Install the package globally using npm:

```bash
npm install -g @bhaireshm/dnm
```

### Usage

After installing the package globally, you can use the CLI command `dnm`.

1. **Run the command**:

   ```bash
   dnm
   ```

2. **Choose an option**:

   - **[0] Exit**: To exit the script.
   - **[1] Delete only node_modules folders**: To delete only `node_modules` folders.
   - **[2] Delete all data**: To delete all contents in the specified directories.

3. **Enter the directory path**:
   - Enter the complete path where you want to delete `node_modules` or all contents.
   - You can enter multiple paths separated by commas.
   - To stop, enter `0`.
   - To restart, enter `1`.

### Examples

#### Example 1: Delete only `node_modules` folders

```bash
dnm
```

- Choose option `[1] Delete only node_modules folders`.
- Enter the directory path: `/path/to/your/project`.

#### Example 2: Delete all data in a directory

```bash
dnm
```

- Choose option `[2] Delete all data`.
- Enter the directory path: `/path/to/your/project`.

#### Example 3: Enter multiple paths

```bash
dnm
```

- Choose an option `[1]` or `[2]`.
- Enter the directory paths separated by commas: `/path/to/your/project1, /path/to/your/project2`.

### Source Code

The source code for this package is available at [GitHub](https://github.com/bhaireshm/delete_node_modules).

### Contributions

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.
