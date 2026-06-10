import { writeFile } from "node:fs/promises";
import registry from "../registry.json";

interface ValidationReport {
    success: boolean;
    modules: Record<string, string[]>;
}

const validateRegistry = async () => {
    const report: ValidationReport = {
        success: true,
        modules: {},
    };

    for (const mod of registry) {
        const errors: string[] = [];

        if (!mod.package) {
            errors.push("package is required");
        }

        if (!mod.version) {
            errors.push("version is required");
        }

        if (!mod.commit) {
            errors.push("commit is required");
        }

        if (!mod.author) {
            errors.push("author is required");
        }

        if (!mod.description) {
            errors.push("description is required");
        }

        const duplicates = registry.filter((m) => m.package === mod.package);

        if (duplicates.length > 1) {
            errors.push("package must be unique");
        }

        let npmData: any = null;

        try {
            const res = await fetch(
                `https://registry.npmjs.org/${mod.package}`,
            );

            if (!res.ok) {
                errors.push("package must exist on npm");
            } else {
                npmData = await res.json();
            }
        } catch {
            errors.push("package must exist on npm");
        }

        const publishedVersion = npmData?.versions?.[mod.version];

        if (!publishedVersion) {
            errors.push("version must exist on npm");
        } else if (publishedVersion.gitHead !== mod.commit) {
            errors.push(
                `gitHead mismatch (expected ${publishedVersion.gitHead}, got ${mod.commit})`,
            );
        }

        if (!Array.isArray(mod.tags)) {
            errors.push("tags must be an array");
        } else if (!mod.tags.every((tag) => typeof tag === "string")) {
            errors.push("tags must be an array of strings");
        }

        if (errors.length > 0) {
            report.success = false;
            report.modules[mod.package] = errors;
        }
    }

    await writeFile(
        "validation-report.json",
        JSON.stringify(report, null, 4),
        "utf8",
    );

    if (!report.success) {
        process.exit(1);
    }
};

validateRegistry();
