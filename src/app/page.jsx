"use client";
import React, { useState, useEffect } from "react";

// サンプル事例データ
const sampleCases = [
  {
    id: 1,
    title: "Sweet Bean Coffee House",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "母娘で始めたカフェが、地元コミュニティとSNS活用で月商150万円超を実現。",
    detail: `\n【業種】カフェ\n【地域】カリフォルニア州\n【創業者】Ronda & Sarah\n【課題】資金不足・集客\n【工夫】地元コミュニティとの連携、SNS活用、サブスクリプション型コーヒーパス導入\n【成果】月商150万円超、安定したリピーター獲得` },
  {
    id: 2,
    title: "Pink Cloud",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
    description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。",
    detail: `\n【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  {
    id: 3,
    title: "Espes 2 Go",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。",
    detail: `\n【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  {
    id: 4,
    title: "Honeybee Speech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。",
    detail: `\n【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  {
    id: 5,
    title: "Queen Bean",
    image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80",
    description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。",
    detail: `\n【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
];

// 成功事例・失敗事例サンプルデータ（20件ずつ）
const successCases = [
  { id: 1, title: "Sweet Bean Coffee House", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", description: "母娘で始めたカフェが、地元コミュニティとSNS活用で月商150万円超を実現。", detail: `【業種】カフェ\n【地域】カリフォルニア州\n【創業者】Ronda & Sarah\n【課題】資金不足・集客\n【工夫】地元コミュニティとの連携、SNS活用、サブスクリプション型コーヒーパス導入\n【成果】月商150万円超、安定したリピーター獲得` },
  { id: 2, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 3, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 4, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 5, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 6, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 7, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 8, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 9, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 10, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 11, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 12, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 13, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 14, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 15, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 16, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 17, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 18, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 19, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 20, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
];
const failureCases = [
  { id: 101, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 102, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 103, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 104, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 105, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 106, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 107, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 108, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 109, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 110, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 111, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 112, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 113, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 114, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 115, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
  { id: 116, title: "Urban Bistro", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "立地選定ミスと資金繰り悪化で半年で閉店した飲食店の例。", detail: `【業種】飲食店\n【地域】東京\n【創業者】田中一郎\n【課題】立地選定ミス、集客不足\n【失敗要因】高額家賃、広告費過多、リピーター獲得できず\n【教訓】事前の市場調査と資金計画の重要性` },
  { id: 117, title: "Pink Cloud", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", description: "ヘルスケアITでオンラインカウンセリングの定額制を導入し、法人契約で安定収益。", detail: `【業種】ヘルスケアIT\n【地域】ロサンゼルス\n【創業者】Jason Varughese\n【課題】顧客獲得・サービスの差別化\n【工夫】オンラインカウンセリングの定額制、B2B契約の拡大\n【成果】月間キャッシュフロー120万円、法人契約で安定収益` },
  { id: 118, title: "Espes 2 Go", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "フードトラックでイベント出店やケータリング契約を拡大し、月平均売上130万円。", detail: `【業種】フードトラック\n【地域】カリフォルニア州\n【創業者】Miguel Quevedo\n【課題】季節変動・売上の波\n【工夫】イベント出店、地元企業とのケータリング契約\n【成果】月平均売上130万円、閑散期も安定` },
  { id: 119, title: "Honeybee Speech", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", description: "オンライン診療と保険適用サービスで顧客単価向上、月間キャッシュフロー110万円。", detail: `【業種】スピーチセラピー\n【地域】南カリフォルニア\n【創業者】Melissa Perez\n【課題】顧客開拓・単価アップ\n【工夫】オンライン診療導入、保険適用サービス拡大\n【成果】月間キャッシュフロー110万円、顧客単価向上` },
  { id: 120, title: "Queen Bean", image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", description: "コーヒー豆ECでサブスクモデルとオリジナルブレンド開発、月商140万円を達成。", detail: `【業種】コーヒー豆EC\n【地域】カリフォルニア州\n【創業者】Ruhi & Sam\n【課題】競合との差別化\n【工夫】サブスクモデル、オリジナルブレンド開発\n【成果】月商140万円、定期購入者増加` },
];

// ページ表示時アニメーション用画像とテキスト
const motivationImages = [
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", label: "製造業" },
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", label: "運転手" },
  { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", label: "プログラマー" },
];

function MainComponent() {
  const [language, setLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState("intro");
  const [modalCase, setModalCase] = useState(null);

  // タブリスト
  const tabs = [
    { id: "intro", label: "はじめに" },
    { id: "success", label: "成功事例" },
    { id: "failure", label: "失敗事例" },
  ];

  // Translations
  const translations = {
    en: {
      title:
        "Successful and Failed Business Examples: Global Cases for Aspiring Entrepreneurs",
      languageSwitch: "日本語",
      introduction: "Introduction",
      whyAnalyzing: "Why Analyzing Both Matters",
      successCases: "Success Cases",
      failureCases: "Failure Cases",
      patterns: "Patterns",
      smallBusinessTips: "Small Business Tips",
      conclusion: "Conclusion",
      introContent: {
        title: "Introduction",
        p1: "In today's rapidly evolving business landscape, understanding the stories behind successful and failed business case studies has never been more valuable. This article explores recent real-world examples from around the globe that offer practical insights for startup founders, side hustlers, and small business owners looking to navigate their entrepreneurial journey.",
        p2: "Whether you're launching a new venture, scaling an existing business, or pivoting your strategy, these global business cases provide a wealth of knowledge that can help you make informed decisions and avoid common pitfalls.",
      },
      whyAnalyzingContent: {
        title: "Why Analyzing Both Success and Failure Matters",
        p1: "While success stories inspire and provide blueprints for growth, failure narratives often contain even more valuable lessons. Understanding why certain businesses thrive while others collapse offers a comprehensive view of the entrepreneurial landscape.",
        callout:
          "Success stories show what's possible and provide strategic frameworks to emulate, but failure stories highlight blind spots, reveal hidden risks, and offer cautionary tales that can save you time, money, and emotional distress.",
        p2: "By studying both outcomes, entrepreneurs can develop a more nuanced understanding of market dynamics, customer behavior, and business model sustainability—all crucial elements for building resilient ventures in today's uncertain economy.",
      },
      // Success cases
      successTitle: "3 Recent Successful Global Business Cases (2023–2025)",
      anthropic: {
        name: "Anthropic – United States",
        industry: "AI Safety and Research",
        founded: "2021",
        didRight: "What They Did Right:",
        right1:
          'Focused on developing "Constitutional AI" with an emphasis on safety and ethical considerations, differentiating from competitors',
        right2:
          "Secured strategic partnerships with major tech companies like Google and Amazon while maintaining independence",
        right3:
          "Balanced rapid scaling with thoughtful product development, releasing Claude AI assistant only when ready",
        metrics: "Key Metrics or Achievements:",
        metric1:
          "Raised over $4 billion in funding with a $20+ billion valuation as of early 2024",
        metric2:
          "Launched Claude 3, which outperformed many competitors in various benchmarks",
        metric3:
          "Established enterprise partnerships across multiple industries",
        learn: "What You Can Learn (small biz angle):",
        learn1:
          "Differentiation through values and principles can create strong market positioning even in crowded spaces",
        learn2:
          "Strategic partnerships can provide resources while maintaining your core mission",
        learn3:
          "Quality and thoughtful development can outweigh being first-to-market",
      },
      shein: {
        name: "Shein – Singapore",
        industry: "Fast Fashion E-commerce",
        founded: "2008 (Major global expansion 2020-2023)",
        didRight: "What They Did Right:",
        right1:
          "Perfected the on-demand manufacturing model with ultra-fast production cycles (concept to product in days)",
        right2:
          "Leveraged social media marketing and influencer partnerships to reach Gen Z consumers",
        right3:
          "Used data analytics to predict trends and minimize inventory waste",
        metrics: "Key Metrics or Achievements:",
        metric1: "Reached a valuation of $66 billion in 2023",
        metric2:
          "Expanded to over 150 countries with minimal physical retail presence",
        metric3: "Achieved over 300 million app downloads globally",
        learn: "What You Can Learn (small biz angle):",
        learn1:
          "Small businesses can adopt a test-and-learn approach with minimal inventory risk",
        learn2:
          "Direct-to-consumer models can scale globally without traditional retail infrastructure",
        learn3:
          "Data-driven decision making can help identify micro-trends before competitors",
      },
      notion: {
        name: "Notion – United States",
        industry: "Productivity SaaS",
        founded: "2016",
        didRight: "What They Did Right:",
        right1:
          "Created an all-in-one workspace tool that consolidated multiple productivity apps",
        right2:
          "Built a product-led growth strategy with freemium model that drove organic adoption",
        right3:
          "Fostered a strong community of users who created templates and tutorials",
        metrics: "Key Metrics or Achievements:",
        metric1: "Reached a $10 billion valuation in 2023",
        metric2: "Grew to over 30 million users with minimal marketing spend",
        metric3:
          "Successfully expanded from individual users to enterprise clients",
        learn: "What You Can Learn (small biz angle):",
        learn1:
          "Solving multiple problems with one elegant solution can create strong product-market fit",
        learn2: "Community-building can replace expensive marketing campaigns",
        learn3:
          "Freemium models can drive adoption while building toward premium conversions",
      },
      // Failure cases
      failureTitle: "3 Recent Failed Global Business Cases (2023–2025)",
      fast: {
        name: "Fast – United States",
        industry: "Fintech (One-Click Checkout)",
        founded: "2019",
        shutDown: "2023",
        wentWrong: "What Went Wrong:",
        wrong1:
          "Excessive spending on marketing and hiring before achieving product-market fit",
        wrong2:
          "Failed to differentiate significantly from established competitors like Shop Pay and PayPal",
        wrong3:
          "Burned through $120 million in funding while generating only $600,000 in revenue",
        takeaway: "Takeaway for Small Businesses:",
        takeaway1:
          "Validate revenue models before scaling operations and marketing",
        takeaway2:
          "Ensure clear differentiation when entering markets with established players",
        takeaway3:
          "Maintain sustainable burn rates aligned with actual business metrics",
      },
      oliveAi: {
        name: "Olive AI – United States",
        industry: "Healthcare AI",
        founded: "2012",
        shutDown: "2023",
        wentWrong: "What Went Wrong:",
        wrong1:
          "Overpromised on AI capabilities that couldn't be delivered at scale",
        wrong2:
          "Rapid expansion into multiple healthcare automation products without perfecting core offerings",
        wrong3:
          "Failed to adapt to post-pandemic market conditions and funding environment",
        takeaway: "Takeaway for Small Businesses:",
        takeaway1:
          "Be realistic about technology capabilities and timelines, especially in regulated industries",
        takeaway2: "Focus on perfecting core products before expanding offerings",
        takeaway3:
          "Build business models that can withstand changing market conditions",
      },
      meesho: {
        name: "Meesho Superstore – India",
        industry: "Quick Commerce",
        founded: "2022 (as division of Meesho)",
        shutDown: "2023",
        wentWrong: "What Went Wrong:",
        wrong1:
          "Attempted to expand into grocery delivery without sufficient infrastructure",
        wrong2:
          "Faced intense competition from well-funded specialists like Zepto and Blinkit",
        wrong3:
          "Failed to leverage existing strengths in social commerce for the new vertical",
        takeaway: "Takeaway for Small Businesses:",
        takeaway1:
          "Expansion should build on existing strengths rather than entering unrelated markets",
        takeaway2:
          "Assess competitive landscape realistically before entering saturated markets",
        takeaway3:
          "Consider capital requirements for infrastructure-heavy business models",
      },
      // Patterns
      patternsContent: {
        title: "Patterns You Can Spot",
        successTraits: "Common Success Traits",
        trait1: "Clear differentiation in crowded markets",
        trait2: "Product-led growth with strong user experience",
        trait3: "Community building as a marketing strategy",
        trait4: "Data-driven decision making for rapid iteration",
        trait5: "Strategic partnerships that accelerate growth",
        trait6: "Balanced scaling aligned with revenue metrics",
        failurePatterns: "Common Failure Patterns",
        pattern1: "Premature scaling before product-market fit",
        pattern2: "Excessive spending on marketing and hiring",
        pattern3: "Lack of differentiation from competitors",
        pattern4: "Overexpansion into unrelated markets",
        pattern5: "Overpromising on technology capabilities",
        pattern6: "Ignoring changing market conditions",
      },
      // Small business tips
      tipsContent: {
        title: "What Should You Do as a Small Business?",
        actionableTitle: "Actionable Tips from These Case Studies",
        tip1: "Validate before scaling: Ensure product-market fit with paying customers before expanding operations or marketing spend.",
        tip2: "Focus on differentiation: Identify your unique value proposition and emphasize it in all marketing and product development.",
        tip3: "Build community: Foster user communities that can drive organic growth and provide valuable feedback.",
        tip4: "Adopt lean methodologies: Test assumptions with minimal viable products before committing significant resources.",
        tip5: "Monitor burn rate: Maintain a sustainable cash flow aligned with actual business metrics, not just growth potential.",
        tip6: "Leverage partnerships: Identify strategic partners that can provide resources, distribution, or credibility.",
        tip7: "Stay focused: Perfect your core offering before expanding into adjacent markets or products.",
        remember:
          "Remember: The most successful businesses often start small, focus on solving specific problems exceptionally well, and scale only after establishing a sustainable model. Many of today's global successes began as focused solutions for niche markets.",
      },
      // Conclusion
      conclusionContent: {
        title: "Conclusion",
        p1: "Studying both successful and failed business case studies provides invaluable insights for entrepreneurs at any stage. The contrasting outcomes highlight that success often hinges on thoughtful execution, market timing, and adaptability rather than just innovative ideas.",
        p2: "As you build your own business, remember that even the most successful companies faced challenges and made pivots along the way. Similarly, many failed ventures contained brilliant elements that were undermined by preventable mistakes.",
        p3: "Take one insight from these global case studies and apply it to your business today. Whether it's reassessing your differentiation strategy, evaluating your burn rate, or building a stronger community around your product, small adjustments based on these lessons can significantly impact your entrepreneurial journey.",
        cta: "Which example resonated most with you? What lesson will you apply to your business this week? Share your thoughts in the comments below!",
      },
      footer: "Last updated: July 18, 2025 | Back to top",
    },
    ja: {
      title: "成功と失敗のビジネス事例：起業家志望者のためのグローバルケース",
      languageSwitch: "English",
      introduction: "はじめに",
      whyAnalyzing: "両方を分析する理由",
      successCases: "成功事例",
      failureCases: "失敗事例",
      patterns: "パターン",
      smallBusinessTips: "小規模ビジネスのヒント",
      conclusion: "結論",
      introContent: {
        title: "はじめに",
        p1: "今日の急速に変化するビジネス環境において、成功と失敗のビジネスケーススタディの背後にあるストーリーを理解することは、かつてないほど価値があります。この記事では、スタートアップ創業者、副業起業家、中小企業オーナーが起業家としての旅を進むための実践的な洞察を提供する、世界中の最近の実例を探ります。",
        p2: "新しいベンチャーを立ち上げる場合でも、既存のビジネスを拡大する場合でも、戦略を転換する場合でも、これらのグローバルなビジネスケースは、情報に基づいた決定を下し、一般的な落とし穴を避けるのに役立つ豊富な知識を提供します。",
      },
      whyAnalyzingContent: {
        title: "両方を分析する理由",
        p1: "成功事例はインスピレーションを与え、成長のための青写真を提供しますが、失敗の物語にはさらに価値のある教訓が含まれていることがよくあります。なぜ特定のビジネスが繁栄し、他のビジネスが崩壊するのかを理解することで、起業家の風景の包括的な見方が得られます。",
        callout:
          "成功事例は可能性を示し、模倣するための戦略的フレームワークを提供しますが、失敗事例は盲点を強調し、隠れたリスクを明らかにし、時間、お金、感情的な苦痛を節約できる警告的な話を提供します。",
        p2: "両方の結果を研究することで、起業家は市場力学、顧客行動、ビジネスモデルの持続可能性についてより微妙な理解を深めることができます。これらはすべて、今日の不確実な経済において回復力のあるベンチャーを構築するための重要な要素です。",
      },
      // Success cases
      successTitle:
        "3つの最近の成功したグローバルビジネスケース（2023年〜2025年）",
      anthropic: {
        name: "Anthropic – アメリカ合衆国",
        industry: "AI安全性と研究",
        founded: "2021年",
        didRight: "彼らが正しく行ったこと：",
        right1:
          "競合他社と差別化するために、安全性と倫理的考慮事項を強調した「Constitutional AI」の開発に焦点を当てた",
        right2:
          "GoogleやAmazonなどの主要テクノロジー企業との戦略的パートナーシップを確保しながら独立性を維持",
        right3:
          "急速なスケーリングと思慮深い製品開発のバランスを取り、Claude AIアシスタントを準備ができた時にのみリリース",
        metrics: "主要な指標または成果：",
        metric1:
          "2024年初頭時点で200億ドル以上の評価額で40億ドル以上の資金調達を達成",
        metric2: "様々なベンチマークで多くの競合他社を上回るClaude 3をリリース",
        metric3: "複数の業界にわたる企業パートナーシップを確立",
        learn: "学べること（小規模ビジネスの視点）：",
        learn1:
          "価値観と原則による差別化は、混雑した市場でも強力な市場ポジショニングを生み出すことができる",
        learn2:
          "戦略的パートナーシップは、コアミッションを維持しながらリソースを提供できる",
        learn3:
          "品質と思慮深い開発は、市場に最初に参入することよりも重要になることがある",
      },
      shein: {
        name: "Shein – シンガポール",
        industry: "ファストファッションEコマース",
        founded: "2008年（2020年〜2023年に主要なグローバル展開）",
        didRight: "彼らが正しく行ったこと：",
        right1:
          "超高速生産サイクル（コンセプトから製品まで数日）でオンデマンド製造モデルを完成させた",
        right2:
          "ソーシャルメディアマーケティングとインフルエンサーパートナーシップを活用してZ世代の消費者にリーチ",
        right3:
          "データ分析を使用してトレンドを予測し、在庫の無駄を最小限に抑えた",
        metrics: "主要な指標または成果：",
        metric1: "2023年に660億ドルの評価額に達した",
        metric2: "物理的な小売店舗をほとんど持たずに150カ国以上に拡大",
        metric3: "世界中で3億以上のアプリダウンロードを達成",
        learn: "学べること（小規模ビジネスの視点）：",
        learn1:
          "小規模ビジネスは在庫リスクを最小限に抑えたテスト・アンド・ラーン・アプローチを採用できる",
        learn2:
          "直接消費者向けモデルは、従来の小売インフラなしでグローバルに拡大できる",
        learn3:
          "データ駆動型の意思決定は、競合他社よりも先にマイクロトレンドを特定するのに役立つ",
      },
      notion: {
        name: "Notion – アメリカ合衆国",
        industry: "生産性SaaS",
        founded: "2016年",
        didRight: "彼らが正しく行ったこと：",
        right1:
          "複数の生産性アプリを統合したオールインワンのワークスペースツールを作成",
        right2:
          "有機的な採用を促進するフリーミアムモデルを持つプロダクト主導の成長戦略を構築",
        right3:
          "テンプレートとチュートリアルを作成するユーザーの強力なコミュニティを育成",
        metrics: "主要な指標または成果：",
        metric1: "2023年に100億ドルの評価額に達した",
        metric2: "最小限のマーケティング支出で3000万人以上のユーザーに成長",
        metric3: "個人ユーザーから企業クライアントへの拡大に成功",
        learn: "学べること（小規模ビジネスの視点）：",
        learn1:
          "1つのエレガントなソリューションで複数の問題を解決することで、強力な製品市場フィットを生み出すことができる",
        learn2:
          "コミュニティ構築は高価なマーケティングキャンペーンに取って代わることができる",
        learn3:
          "フリーミアムモデルはプレミアムコンバージョンに向けて構築しながら採用を促進できる",
      },
      // Failure cases
      failureTitle:
        "3つの最近の失敗したグローバルビジネスケース（2023年〜2025年）",
      fast: {
        name: "Fast – アメリカ合衆国",
        industry: "フィンテック（ワンクリック決済）",
        founded: "2019年",
        shutDown: "2023年",
        wentWrong: "何が間違っていたか：",
        wrong1:
          "製品市場フィットを達成する前にマーケティングと採用に過剰な支出",
        wrong2:
          "Shop PayやPayPalなどの確立された競合他社との有意な差別化に失敗",
        wrong3:
          "1億2000万ドルの資金を使い果たしながら、収益はわずか60万ドルしか生み出せなかった",
        takeaway: "小規模ビジネスへの教訓：",
        takeaway1: "運営とマーケティングを拡大する前に収益モデルを検証する",
        takeaway2:
          "確立されたプレーヤーがいる市場に参入する際は、明確な差別化を確保する",
        takeaway3:
          "実際のビジネス指標に合わせた持続可能なバーンレートを維持する",
      },
      oliveAi: {
        name: "Olive AI – アメリカ合衆国",
        industry: "ヘルスケアAI",
        founded: "2012年",
        shutDown: "2023年",
        wentWrong: "何が間違っていたか：",
        wrong1: "スケールで提供できないAI機能を過剰に約束した",
        wrong2:
          "コア製品を完成させる前に、複数のヘルスケア自動化製品への急速な拡大",
        wrong3: "パンデミック後の市場状況と資金調達環境への適応に失敗",
        takeaway: "小規模ビジネスへの教訓：",
        takeaway1:
          "特に規制された業界では、技術能力とタイムラインについて現実的であること",
        takeaway2: "提供を拡大する前にコア製品を完成させることに集中する",
        takeaway3: "変化する市場状況に耐えられるビジネスモデルを構築する",
      },
      meesho: {
        name: "Meesho Superstore – インド",
        industry: "クイックコマース",
        founded: "2022年（Meeshoの部門として）",
        shutDown: "2023年",
        wentWrong: "何が間違っていたか：",
        wrong1: "十分なインフラなしに食料品配達に拡大しようとした",
        wrong2:
          "ZeptoやBlinkitなどの十分な資金を持つ専門家からの激しい競争に直面",
        wrong3:
          "新しい垂直分野でソーシャルコマースの既存の強みを活用できなかった",
        takeaway: "小規模ビジネスへの教訓：",
        takeaway1:
          "拡大は関連のない市場に参入するのではなく、既存の強みに基づいて行うべき",
        takeaway2: "飽和した市場に参入する前に競争環境を現実的に評価する",
        takeaway3: "インフラが重要なビジネスモデルの資本要件を考慮する",
      },
      // Patterns
      patternsContent: {
        title: "見つけられるパターン",
        successTraits: "共通の成功特性",
        trait1: "混雑した市場での明確な差別化",
        trait2: "強力なユーザーエクスペリエンスを持つプロダクト主導の成長",
        trait3: "マーケティング戦略としてのコミュニティ構築",
        trait4: "迅速な反復のためのデータ駆動型意思決定",
        trait5: "成長を加速する戦略的パートナーシップ",
        trait6: "収益指標に合わせたバランスの取れたスケーリング",
        failurePatterns: "共通の失敗パターン",
        pattern1: "製品市場フィット前の早すぎるスケーリング",
        pattern2: "マーケティングと採用への過剰な支出",
        pattern3: "競合他社との差別化の欠如",
        pattern4: "関連のない市場への過剰な拡大",
        pattern5: "技術能力の過剰な約束",
        pattern6: "変化する市場状況の無視",
      },
      // Small business tips
      tipsContent: {
        title: "小規模ビジネスとして何をすべきか？",
        actionableTitle: "これらのケーススタディからの実行可能なヒント",
        tip1: "スケーリング前に検証する：運営やマーケティング支出を拡大する前に、支払い顧客との製品市場フィットを確保する。",
        tip2: "差別化に焦点を当てる：あなたのユニークな価値提案を特定し、すべてのマーケティングと製品開発でそれを強調する。",
        tip3: "コミュニティを構築する：有機的な成長を促進し、貴重なフィードバックを提供するユーザーコミュニティを育成する。",
        tip4: "リーン方法論を採用する：重要なリソースをコミットする前に、最小限の実行可能な製品で仮説をテストする。",
        tip5: "バーンレートを監視する：成長の可能性だけでなく、実際のビジネス指標に合わせた持続可能なキャッシュフローを維持する。",
        tip6: "パートナーシップを活用する：リソース、配布、または信頼性を提供できる戦略的パートナーを特定する。",
        tip7: "集中を維持する：隣接する市場や製品に拡大する前に、コア製品を完成させる。",
        remember:
          "覚えておいてください：最も成功したビジネスは、小さく始まり、特定の問題を例外的によく解決することに集中し、持続可能なモデルを確立した後にのみスケールすることがよくあります。今日のグローバルな成功の多くは、ニッチ市場向けの集中したソリューションとして始まりました。",
      },
      // Conclusion
      conclusionContent: {
        title: "結論",
        p1: "成功と失敗の両方のビジネスケーススタディを研究することは、どの段階の起業家にも貴重な洞察を提供します。対照的な結果は、成功がしばしば革新的なアイデアだけでなく、思慮深い実行、市場タイミング、適応性にかかっていることを強調しています。",
        p2: "自分のビジネスを構築する際には、最も成功した企業でさえも課題に直面し、途中でピボットを行ったことを覚えておいてください。同様に、多くの失敗したベンチャーには、防ぐことができる間違いによって損なわれた素晴らしい要素が含まれていました。",
        p3: "これらのグローバルケーススタディから一つの洞察を取り、今日あなたのビジネスに適用してください。差別化戦略の再評価、バーンレートの評価、または製品の周りにより強力なコミュニティを構築するかどうかにかかわらず、これらの教訓に基づく小さな調整があなたの起業家としての旅に大きな影響を与える可能性があります。",
        cta: "どの例があなたに最も共感しましたか？今週あなたのビジネスにどの教訓を適用しますか？以下のコメントであなたの考えを共有してください！",
      },
      footer: "最終更新日：2025年7月18日 | トップに戻る",
    },
  };

  // Function to render the active tab content
  const renderTabContent = () => {
    const t = translations[language];

    switch (activeTab) {
      case "introduction":
        return (
          <section id="introduction" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.introContent.title}
            </h2>
            <p className="text-gray-700 mb-4">{t.introContent.p1}</p>
            <p className="text-gray-700">{t.introContent.p2}</p>
          </section>
        );
      case "why-analyzing":
        return (
          <section id="why-analyzing" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.whyAnalyzingContent.title}
            </h2>
            <p className="text-gray-700 mb-4">{t.whyAnalyzingContent.p1}</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-gray-800">{t.whyAnalyzingContent.callout}</p>
            </div>
            <p className="text-gray-700">{t.whyAnalyzingContent.p2}</p>
          </section>
        );
      case "success-cases":
        return (
          <section id="success-cases" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.successTitle}
            </h2>

            {/* Success case cards with hover effects */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Anthropic Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-green-200">
                <div className="bg-green-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.anthropic.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.anthropic.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-3">{t.anthropic.founded}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.anthropic.didRight}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.anthropic.right1}</li>
                      <li>{t.anthropic.right2}</li>
                      <li>{t.anthropic.right3}</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.anthropic.metrics}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.anthropic.metric1}</li>
                      <li>{t.anthropic.metric2}</li>
                      <li>{t.anthropic.metric3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.anthropic.learn}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.anthropic.learn1}</li>
                      <li>{t.anthropic.learn2}</li>
                      <li>{t.anthropic.learn3}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Shein Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-green-200">
                <div className="bg-green-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.shein.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.shein.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-3">{t.shein.founded}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.shein.didRight}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.shein.right1}</li>
                      <li>{t.shein.right2}</li>
                      <li>{t.shein.right3}</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.shein.metrics}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.shein.metric1}</li>
                      <li>{t.shein.metric2}</li>
                      <li>{t.shein.metric3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.shein.learn}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.shein.learn1}</li>
                      <li>{t.shein.learn2}</li>
                      <li>{t.shein.learn3}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Notion Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-green-200">
                <div className="bg-green-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.notion.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.notion.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-3">{t.notion.founded}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.notion.didRight}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.notion.right1}</li>
                      <li>{t.notion.right2}</li>
                      <li>{t.notion.right3}</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.notion.metrics}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.notion.metric1}</li>
                      <li>{t.notion.metric2}</li>
                      <li>{t.notion.metric3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.notion.learn}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.notion.learn1}</li>
                      <li>{t.notion.learn2}</li>
                      <li>{t.notion.learn3}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "failure-cases":
        return (
          <section id="failure-cases" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.failureTitle}
            </h2>

            {/* Failure case cards with hover effects */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Fast Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-red-200">
                <div className="bg-red-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.fast.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.fast.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-1">{t.fast.founded}</p>
                  <p className="text-gray-600 mb-3">{t.fast.shutDown}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.fast.wentWrong}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.fast.wrong1}</li>
                      <li>{t.fast.wrong2}</li>
                      <li>{t.fast.wrong3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.fast.takeaway}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.fast.takeaway1}</li>
                      <li>{t.fast.takeaway2}</li>
                      <li>{t.fast.takeaway3}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Olive AI Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-red-200">
                <div className="bg-red-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.oliveAi.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.oliveAi.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-1">{t.oliveAi.founded}</p>
                  <p className="text-gray-600 mb-3">{t.oliveAi.shutDown}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.oliveAi.wentWrong}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.oliveAi.wrong1}</li>
                      <li>{t.oliveAi.wrong2}</li>
                      <li>{t.oliveAi.wrong3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.oliveAi.takeaway}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.oliveAi.takeaway1}</li>
                      <li>{t.oliveAi.takeaway2}</li>
                      <li>{t.oliveAi.takeaway3}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Meesho Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-red-200">
                <div className="bg-red-500 text-white p-3">
                  <h3 className="text-xl font-bold">{t.meesho.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-1">
                    <strong>{t.meesho.industry}</strong>
                  </p>
                  <p className="text-gray-600 mb-1">{t.meesho.founded}</p>
                  <p className="text-gray-600 mb-3">{t.meesho.shutDown}</p>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.meesho.wentWrong}
                    </p>
                    <ul className="list-disc ml-6 mb-3 text-gray-700 text-sm">
                      <li>{t.meesho.wrong1}</li>
                      <li>{t.meesho.wrong2}</li>
                      <li>{t.meesho.wrong3}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      {t.meesho.takeaway}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>{t.meesho.takeaway1}</li>
                      <li>{t.meesho.takeaway2}</li>
                      <li>{t.meesho.takeaway3}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "patterns":
        return (
          <section id="patterns" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.patternsContent.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {t.patternsContent.successTraits}
                </h3>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>
                    <strong>{t.patternsContent.trait1}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.trait2}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.trait3}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.trait4}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.trait5}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.trait6}</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {t.patternsContent.failurePatterns}
                </h3>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>
                    <strong>{t.patternsContent.pattern1}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.pattern2}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.pattern3}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.pattern4}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.pattern5}</strong>
                  </li>
                  <li>
                    <strong>{t.patternsContent.pattern6}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        );
      case "small-business-tips":
        return (
          <section id="small-business-tips" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.tipsContent.title}
            </h2>

            <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t.tipsContent.actionableTitle}
              </h3>
              <ol className="list-decimal ml-6 text-gray-700 space-y-3">
                <li>
                  <strong>{t.tipsContent.tip1.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip1.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip2.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip2.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip3.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip3.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip4.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip4.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip5.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip5.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip6.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip6.split(":")[1]}
                </li>
                <li>
                  <strong>{t.tipsContent.tip7.split(":")[0]}</strong>:{" "}
                  {t.tipsContent.tip7.split(":")[1]}
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg shadow-md">
              <p className="text-gray-800">
                <strong>{t.tipsContent.remember.split(":")[0]}</strong>:{" "}
                {t.tipsContent.remember.split(":")[1]}
              </p>
            </div>
          </section>
        );
      case "conclusion":
        return (
          <section id="conclusion" className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t.conclusionContent.title}
            </h2>
            <p className="text-gray-700 mb-4">{t.conclusionContent.p1}</p>
            <p className="text-gray-700 mb-4">{t.conclusionContent.p2}</p>
            <p className="text-gray-700 mb-6">{t.conclusionContent.p3}</p>
            <div className="bg-gray-100 p-5 rounded-lg shadow-md">
              <p className="text-gray-800 font-medium">
                {t.conclusionContent.cta}
              </p>
            </div>
          </section>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  // アニメーション用の業種画像リスト
  const industryImages = [
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", label: "IT" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", label: "飲食" },
    { src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", label: "医療" },
    { src: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9a2f?auto=format&fit=crop&w=600&q=80", label: "建設" },
    { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", label: "教育" },
  ];

  // アニメーション表示制御
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    // sessionStorageで遷移元判定
    const fromOtherPage = sessionStorage.getItem("fromOtherPage");
    // sessionStorageが空（初回やスパーリロード）なら必ずアニメーション表示
    if (fromOtherPage === "true" || fromOtherPage === null) {
      setShowAnimation(true);
      sessionStorage.removeItem("fromOtherPage");
    }
  }, []);

  useEffect(() => {
    if (showAnimation && animationStep < industryImages.length) {
      const timer = setTimeout(() => {
        setAnimationStep((prev) => prev + 1);
      }, 900); // 0.9秒ごとに切り替え
      return () => clearTimeout(timer);
    } else if (showAnimation && animationStep >= industryImages.length) {
      setTimeout(() => {
        setShowAnimation(false);
        setAnimationDone(true);
      }, 700); // 最後の画像の余韻
    }
  }, [showAnimation, animationStep]);

  // 他ページからトップに遷移する際はsessionStorageにフラグを立てる（例：リンクボタンで）
  // これは他ページのリンクでonClick={() => sessionStorage.setItem("fromOtherPage", "true")} などで対応

  // ページ表示時アニメーション用state
  const [showMotivation, setShowMotivation] = useState(true);
  const [motivationStep, setMotivationStep] = useState(0);

  useEffect(() => {
    if (showMotivation && motivationStep < motivationImages.length) {
      const timer = setTimeout(() => {
        setMotivationStep((prev) => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else if (showMotivation && motivationStep >= motivationImages.length) {
      setTimeout(() => {
        setShowMotivation(false);
      }, 700);
    }
  }, [showMotivation, motivationStep]);

  // カードレイアウト&モーダルUI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white font-roboto">
      {/* ページ表示時アニメーション */}
      {showMotivation && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-100">
          <div className="w-72 h-72 flex items-center justify-center relative">
            <img
              src={motivationImages[Math.min(motivationStep, motivationImages.length - 1)].src}
              alt={motivationImages[Math.min(motivationStep, motivationImages.length - 1)].label}
              className="rounded-2xl shadow-2xl object-cover w-full h-full animate-fadeIn"
              style={{ transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-2xl font-bold drop-shadow-lg animate-fadeIn">
              {motivationImages[Math.min(motivationStep, motivationImages.length - 1)].label}
            </div>
          </div>
          <div className="mt-8 text-3xl sm:text-4xl font-bold text-white tracking-wide animate-fadeIn">
            スモールビジネスは、<br className="sm:hidden" />あなたにもできる。
          </div>
        </div>
      )}
      {/* 通常表示（アニメーション終了後） */}
      {!showMotivation && (
        <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center tracking-tight leading-tight text-cyan-200 drop-shadow">スモールビジネス事例集</h1>
          {/* タブナビゲーション */}
          <nav className="flex justify-center mb-6 sm:mb-8 gap-2 sm:gap-4" aria-label="事例カテゴリ">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 rounded-full font-bold transition-colors duration-200 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${activeTab === tab.id ? "bg-cyan-500 text-white shadow" : "bg-gray-800 text-cyan-300 hover:bg-cyan-700 hover:text-white"}`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {/* タブ内容 */}
          {activeTab === "intro" && (
            <section className="bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-8 text-base sm:text-lg text-gray-100 mb-8 animate-fadeIn text-left max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-300">はじめに</h2>
              <p>
                このサイトでは、スモールビジネスで毎月100万円以上のキャッシュを生み出す仕組みを作った
                <span className="block sm:inline">「成功事例」と、リアルな「失敗事例」を多数紹介しています。</span>
              </p>
              <p className="mt-4">
                どの事例も、最初はごく普通の会社員や主婦、副業からのスタート、
                <span className="block sm:inline">未経験からの挑戦など、特別な才能や資金がなくても始められたものばかりです。</span>
              </p>
              <p className="mt-4">
                「自分にもできるかも」「一歩踏み出してみたい」
                <span className="block sm:inline">――そんな気持ちを後押しするために、</span>
                <span className="block sm:inline">リアルなストーリーと具体的な工夫・失敗・学びをまとめました。</span>
              </p>
              <p className="mt-4 text-cyan-200 font-semibold">
                きっと、あなたにもできる。<br />
                まずは気になる事例から、あなたの未来のヒントを見つけてください。
              </p>
            </section>
          )}
          {activeTab === "success" && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
              {successCases.map((c) => (
                <article key={c.id} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-[1.025] transition-transform duration-300 min-h-[340px]">
                  <img src={c.image} alt={c.title} className="w-full h-40 sm:h-48 object-cover" loading="lazy" />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-300 line-clamp-2">{c.title}</h2>
                    <p className="text-gray-200 mb-4 flex-1 line-clamp-3">{c.description}</p>
                    <button onClick={() => setModalCase(c)} className="mt-auto bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md w-full">続きを見る</button>
                  </div>
                </article>
              ))}
            </section>
          )}
          {activeTab === "failure" && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
              {failureCases.map((c) => (
                <article key={c.id} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-[1.025] transition-transform duration-300 min-h-[340px]">
                  <img src={c.image} alt={c.title} className="w-full h-40 sm:h-48 object-cover" loading="lazy" />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-300 line-clamp-2">{c.title}</h2>
                    <p className="text-gray-200 mb-4 flex-1 line-clamp-3">{c.description}</p>
                    <button onClick={() => setModalCase(c)} className="mt-auto bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md w-full">続きを見る</button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      )}
      {/* モーダル */}
      {typeof window !== "undefined" && modalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn px-2">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-8 relative animate-fadeInUp mx-auto">
            <button onClick={() => setModalCase(null)} className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400 text-2xl font-bold">×</button>
            <img src={modalCase.image} alt={modalCase.title} className="w-full h-40 sm:h-56 object-cover rounded-xl mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-cyan-300 text-center">{modalCase.title}</h2>
            <pre className="text-gray-100 whitespace-pre-wrap mb-2 text-base sm:text-lg text-center">{modalCase.detail}</pre>
          </div>
        </div>
      )}
      {/* アニメーション用スタイルとテキスト省略用ユーティリティ */}
      <style jsx global>{`
        .animate-fadeIn { animation: fadeIn 0.4s ease; }
        .animate-fadeInUp { animation: fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}

export default MainComponent;