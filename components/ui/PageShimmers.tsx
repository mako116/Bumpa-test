import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Shimmer } from "./Shimmer";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Spacing, BorderRadius } from "@/constants/theme";

const { width } = Dimensions.get("window");

export function HomeShimmer() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {}
      <View style={styles.heroWrapper}>
        <Shimmer height={hp(26)} borderRadius={BorderRadius.lg} />
      </View>

      {}
      <View style={styles.horizontalRow}>
        {[1, 2, 3, 4].map((i) => (
          <Shimmer
            key={i}
            width={wp(22)}
            height={hp(4.5)}
            borderRadius={BorderRadius.full}
            style={{ marginRight: Spacing.sm }}
          />
        ))}
      </View>

      {}
      <View style={styles.sectionTitleWrapper}>
        <Shimmer width={wp(35)} height={20} borderRadius={BorderRadius.xs} />
      </View>

      {}
      <View style={[styles.horizontalRow, { height: hp(28) }]}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.trendingCardMock}>
            <Shimmer
              height={hp(18)}
              borderRadius={BorderRadius.md}
              style={{ marginBottom: Spacing.sm }}
            />
            <Shimmer width="80%" height={14} style={{ marginBottom: 4 }} />
            <Shimmer width="50%" height={12} />
          </View>
        ))}
      </View>

      <View style={styles.sectionTitleWrapper}>
        <Shimmer width={wp(40)} height={20} borderRadius={BorderRadius.xs} />
      </View>

      <View style={styles.grid}>
        {[1, 2, 4, 5].map((i) => (
          <View key={i} style={styles.gridItem}>
            <Shimmer
              height={hp(22)}
              borderRadius={BorderRadius.lg}
              style={{ marginBottom: Spacing.sm }}
            />
            <Shimmer width="80%" height={14} style={{ marginBottom: 4 }} />
            <Shimmer width="60%" height={12} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function SearchShimmer() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} style={styles.gridItem}>
            <Shimmer
              height={hp(22)}
              borderRadius={BorderRadius.lg}
              style={{ marginBottom: Spacing.sm }}
            />
            <Shimmer width="80%" height={14} style={{ marginBottom: 4 }} />
            <Shimmer width="60%" height={12} />
          </View>
        ))}
      </View>
    </View>
  );
}

export function DetailsShimmer() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.coverWrapper}>
        <Shimmer
          width={width * 0.45}
          height={hp(30)}
          borderRadius={BorderRadius.md}
        />
      </View>

      <View style={styles.infoCardMock}>
        <View style={styles.rowJustified}>
          <Shimmer width={60} height={16} borderRadius={4} />
          <Shimmer width={80} height={16} borderRadius={4} />
        </View>

        <Shimmer
          width="90%"
          height={24}
          style={{ marginVertical: Spacing.md }}
        />
        <Shimmer width="45%" height={16} style={{ marginBottom: Spacing.lg }} />

        <View style={styles.rowJustified}>
          <Shimmer width={100} height={20} />
          <Shimmer width={80} height={20} />
        </View>

        <View style={styles.dividerMock} />

        {}
        <View style={styles.rowJustified}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={{ alignItems: "center", flex: 1 }}>
              <Shimmer width="60%" height={12} style={{ marginBottom: 4 }} />
              <Shimmer width="80%" height={16} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionMock}>
        <Shimmer width={100} height={18} style={{ marginBottom: Spacing.md }} />
        <Shimmer
          width="100%"
          height={14}
          style={{ marginBottom: Spacing.xs }}
        />
        <Shimmer
          width="100%"
          height={14}
          style={{ marginBottom: Spacing.xs }}
        />
        <Shimmer width="85%" height={14} style={{ marginBottom: Spacing.lg }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroWrapper: {
    paddingHorizontal: wp(2),

    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  horizontalRow: {
    flexDirection: "row",
    paddingHorizontal: wp(2),

    marginVertical: Spacing.md,
    alignItems: "center",
  },
  trendingCardMock: {
    width: wp(30),
    marginRight: Spacing.md,
  },
  sectionTitleWrapper: {
    paddingHorizontal: wp(2),

    marginVertical: Spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.sm,
  },
  gridItem: {
    width: "50%",
    padding: Spacing.sm,
  },
  coverWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl,
  },
  infoCardMock: {
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: "transparent",
    borderWidth: 0,
    marginBottom: Spacing.md,
  },
  rowJustified: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dividerMock: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: Spacing.md,
  },
  sectionMock: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
});
